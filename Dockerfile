# Copyright (C) 2023 Ibrahem Mouhamad
#
# SPDX-License-Identifier: MIT

FROM ubuntu:20.04 as build-image

ARG http_proxy
ARG https_proxy
ARG no_proxy=
ARG socks_proxy
ARG DJANGO_CONFIGURATION="production"

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends install -yq \
    apache2-dev \
    build-essential \
    curl \
    libldap2-dev \
    libsasl2-dev \
    nasm \
    git \
    pkg-config \
    python3-dev \
    python3-pip \
    python3-venv && \
    rm -rf /var/lib/apt/lists/*

# Install requirements
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:${PATH}"
RUN python3 -m pip install --no-cache-dir -U pip==22.2.2 setuptools==60.6.0 wheel==0.37.1
COPY booklist/requirements/ /tmp/requirements/
RUN python3 -m pip install --no-cache-dir -r /tmp/requirements/${DJANGO_CONFIGURATION}.txt


FROM ubuntu:20.04

ARG http_proxy
ARG https_proxy
ARG no_proxy=
ARG socks_proxy
ARG TZ="Etc/UTC"

ENV TERM=xterm \
    http_proxy=${http_proxy}   \
    https_proxy=${https_proxy} \
    no_proxy=${no_proxy} \
    socks_proxy=${socks_proxy} \
    LANG='C.UTF-8'  \
    LC_ALL='C.UTF-8' \
    TZ=${TZ}

ARG USER="django"
ARG DJANGO_CONFIGURATION="production"
ENV DJANGO_CONFIGURATION=${DJANGO_CONFIGURATION}

# Install necessary apt packages
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get --no-install-recommends install -yq \
    apache2 \
    ca-certificates \
    libapache2-mod-xsendfile \
    libgomp1 \
    libgl1 \
    supervisor \
    libldap-2.4-2 \
    libsasl2-2 \
    libpython3-dev \
    tzdata \
    python3-distutils \
    p7zip-full \
    git \
    git-lfs \
    poppler-utils \
    ssh \
    curl && \
    ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata && \
    rm -rf /var/lib/apt/lists/* && \
    echo 'application/wasm wasm' >> /etc/mime.types

# Add a non-root user
ENV USER=${USER}
ENV HOME /home/${USER}
RUN adduser --shell /bin/bash --disabled-password --gecos "" ${USER} && \
    if [ -z ${socks_proxy} ]; then \
    echo export "GIT_SSH_COMMAND=\"ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30\"" >> ${HOME}/.bashrc; \
    else \
    echo export "GIT_SSH_COMMAND=\"ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 -o ProxyCommand='nc -X 5 -x ${socks_proxy} %h %p'\"" >> ${HOME}/.bashrc; \
    fi

# Copy python virtual environment from build-image
COPY --from=build-image /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:${PATH}"
ENV NUMPROCS=1

# Install and initialize BookList, copy all necessary files
COPY --chown=${USER} supervisord/ ${HOME}/supervisord
COPY --chown=${USER} mod_wsgi.conf wait-for-it.sh manage.py ${HOME}/
COPY --chown=${USER} booklist/ ${HOME}/booklist

# RUN all commands below as 'django' user
USER ${USER}
WORKDIR ${HOME}

RUN mkdir data keys logs /tmp/supervisord
RUN python3 manage.py collectstatic

EXPOSE 8080
ENTRYPOINT ["/usr/bin/supervisord"]
CMD ["-c", "supervisord/all.conf"]