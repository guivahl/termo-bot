FROM postgres

ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB termo
ENV POSTGRES_USER postgres

COPY ./data/words.csv .

COPY ./data/setup.sql /docker-entrypoint-initdb.d/

ADD ./data/setup.sql /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*

EXPOSE 6666

