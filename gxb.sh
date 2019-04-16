#!/bin/bash
### BEGIN INIT INFO
# Provides:  simon huang
# Required-Start: $all
# Required-Stop: $all
# Default-Start: 2 3 4 5
# Default-Stop:  0 1 6
# Short-Description: Start daemon at boot time
# Description:  Enable service provided by daemon.
### END INIT INFO
# chkconfig: 345 88 08
# description: Forever for Node.js

export PATH=$PATH:/root/.nvm/versions/node/v10.15.0/bin/npm
export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules 这里是Node类库的路径

npm=npm

case "$1" in
 start)
  $npm start
  ;;
 stop)
  $npm stop
  ;;
 *)
  echo "Usage: /etc.init.d/node {start|stop|restart|reload|stopall|restartall|list}"
  exit 1
  ;;
esac
