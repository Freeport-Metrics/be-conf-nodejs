# Be@conf - node.js server

This is a web part of Be@conf project. Server manipulates communication between connected
clients and broadcast events.

Server is deployed to openshit PaaS service.

## Technologies used:

* Socket.IO ( 1.4.5 )
* Node.js ( 5.5.0 )

## Installation steps

Assuming that you have homebrew:

    brew install node

Next step is to install dependencies

    npm install

## Running

To run application:

    npm start

And navigate to [http://localhost:3000/](http://localhost:3000/)

Openshift version is located at [http://beatconf-freeportmetrics.rhcloud.com/](http://beatconf-freeportmetrics.rhcloud.com/)

## Deployment

You can deploy application to openshift 2 ways:

* Automatically ( Using Bitrise CI )
* Manually ( Your SSH key has to be added to openshift application )
  * git remote add openshift -f [ssh://56e15f7f89f5cf738e000167@beatconf-freeportmetrics.rhcloud.com/~/git/beatconf.git/](ssh://56e15f7f89f5cf738e000167@beatconf-freeportmetrics.rhcloud.com/~/git/beatconf.git/)
  * git merge openshift/master -s recursive -X ours
  * git push openshift master

*If you have permission denied error remember to add your ssh key to ssh-agent via command*

    ssh-add ~/.ssh/<yourprivatekey>



