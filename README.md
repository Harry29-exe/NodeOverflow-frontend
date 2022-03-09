![img.png](readme_files/banner.png)
#NodeOverflow 


#### NodeOverflow is web application using flow programming concept for image processing
This project is split into to repositories: this one containing 
application frontend and the other one containing backend.
Second repository can be found under this link:</br>
https://github.com/Harry29-exe/NodeOverflow-backend

##Application functionality

### Node based image editor
![img_2.png](readme_files/editor.png)

###Input node
It loads image from given location and is input to whole system.
![img.png](readme_files/input_node.png)
###Output node
It's role is to be output of the system and from it, parser start
interpreting node structure.
![img_1.png](readme_files/output_node.png)
###Connecting nodes
To connect nodes user need to click on output dot of input node and drag it
to input dot of output node.
![img.png](readme_files/connecting_nodes.png)
![img_1.png](readme_files/connected_nodes.png)

###Loading image and rendering it
User can select image just by pressing "Image not loaded" button in the input node.
To render it user need to press render button in display panel.
![img.png](readme_files/rendered_image.png)

###Node shelve
More nodes can be dropped from node shelve on the left side of the screen
![img.png](readme_files/node_shelve.png)

###Filter nodes
Many filter nodes can be combined to create interesting results.
![img.png](readme_files/many_nodes.png)


###Other functions
More over application supports:
- registering/logging users
- storing/loading users' projects
- searching through user's projects