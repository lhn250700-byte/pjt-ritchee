#!/bin/bash

# 1. plain이 붙지 않은 진짜 실행 가능한 jar 파일만 변수에 담습니다.
BUILD_JAR=$(ls /home/ubuntu/app/*.jar | grep -v 'plain' | tail -n 1)

# 만약 진짜 jar 파일이 없다면 에러 로그를 남기고 종료합니다.
if [ -z "$BUILD_JAR" ]; then
    echo ">>> [ERROR] 실행 가능한 JAR 파일을 찾을 수 없습니다. build.gradle 설정을 확인하세요." >> /home/ubuntu/deploy.log
    exit 1
fi

JAR_NAME=$(basename $BUILD_JAR)
echo ">>> build 파일명: $JAR_NAME" >> /home/ubuntu/deploy.log

echo ">>> build 파일 복사" >> /home/ubuntu/deploy.log
DEPLOY_PATH=/home/ubuntu/app/
cp $BUILD_JAR $DEPLOY_PATH

echo ">>> 현재 실행 중인 스프링 부트 애플리케이션 pid 확인" >> /home/ubuntu/deploy.log
# 안전하게 진짜 jar로 실행 중인 java 프로세스의 PID만 쏙 골라냅니다.
CURRENT_PID=$(pgrep -f "$JAR_NAME")

if [ -z "$CURRENT_PID" ]; then
    echo ">>> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ubuntu/deploy.log
else
    echo ">>> 현재 구동 중인 애플리케이션 종료 (PID: $CURRENT_PID)" >> /home/ubuntu/deploy.log
    sudo kill -15 $CURRENT_PID
    sleep 5
fi

DEPLOY_JAR=$DEPLOY_PATH$JAR_NAME
echo ">>> DEPLOY_JAR 배포" >> /home/ubuntu/deploy.log
echo ">>> $DEPLOY_JAR의 $JAR_NAME를 실행합니다" >> /home/ubuntu/deploy.log

# 2. 백그라운드로 실행하며 로그는 원래 설정하신 곳으로 보냅니다.
nohup java -jar $DEPLOY_JAR >> /home/ubuntu/deploy.log 2>> /home/ubuntu/deploy_err.log &