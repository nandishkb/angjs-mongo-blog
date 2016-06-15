package com.codefox.blog.data;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MongoServiceFactory {
    
    
    private static ThreadLocal<Datastore> mongoTL = new ThreadLocal<Datastore>();
    
    /**
     * Method to retrieve a mongo database client from the thread local storage
     * @return
     */
    public static Datastore getMongoDB(){
        String address = "localhost";
        address = "173.36.55.239";
        if(mongoTL.get()==null){
            MongoClientURI connectionString = new MongoClientURI("mongodb://"+address+":27017");
            MongoClient mongoClient = new MongoClient(connectionString);    
            Morphia morphia = new Morphia();
            morphia.mapPackage("com.codefox.blog.api");
            Datastore datastore = morphia.createDatastore(mongoClient, "blog");
            datastore.ensureIndexes();
            mongoTL.set(datastore);
            return datastore;
        }
        return mongoTL.get();
    }
    
}
