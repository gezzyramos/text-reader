
# set -e

  

   #Check if project dependencies exist
   if [ ! -d npm_modules ] || [ -e npm_modules ]; then
        npm install
   fi

   #start server
   node server.js

# exec "$@"