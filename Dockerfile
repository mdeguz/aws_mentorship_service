# Set up the base image
FROM public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 AS aws-lambda-adapter
FROM denoland/deno:bin AS deno_bin
FROM debian:bookworm-slim AS deno_runtime

COPY --from=aws-lambda-adapter /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=deno_bin /deno /usr/local/bin/deno

ENV PORT=8000
EXPOSE ${PORT}

ENV DENO_DIR=/var/deno_dir
RUN mkdir ${DENO_DIR}

ENV TASK_DIR=/var/task
WORKDIR ${TASK_DIR}
COPY . ${TASK_DIR}

ENV INDEX_FILE=src/index.ts

# Warm-up caches
RUN timeout 10s deno run -A ${INDEX_FILE} || [ $? -eq 124 ] || exit 1

CMD ["deno", "run", "--allow-all", "${INDEX_FILE}"]
