# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4
# Set the working directory to /api
WORKDIR /server
# copy package.json into the container at /api
COPY package.json /server/package.json
# Things for bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . /server/
# Make port 80 available to the world outside this container
EXPOSE 8080
# Run the app when the container launches
CMD ["npm", "start"]