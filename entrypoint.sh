
#Check if project dependencies exist
if [ ! -d npm_modules ] || [ -e npm_modules ]; then
    npm install
fi

adonis serve