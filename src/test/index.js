import React, { useState, useEffect} from 'react';

import TestShow from './show'

export default function TestIndex() {

  const [usersList, setUser] = useState([{}]);
  const [first_name, setFirstName] = useState("nombre");
  const [userSelected, setUserSelected] = useState({});

  //addUser api call
  const [newUser, addUser] = useState('');

  const addusersList = e => {
    setUser([
      ...usersList,
      {id:e.id, name: e.name}
    ]);
    // do other stuff
    console.log("udpated")
  };


  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1')
		  .then(function(response) {
		  	console.log(response)
		    return response.json();
		  })
		  .then(function(myJson) {
		    console.log(myJson.data);
		    setUser(myJson.data)
		  });
    // Specify how to clean up after this effect:
    return function cleanup() {
    	setUser([{}])
    };
  }, []);  



  useEffect(() => {
  	if(newUser != ""){
    	console.log(newUser)
	    fetch('https://reqres.in/api/users', {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json",        
	        },
	        body: JSON.stringify(newUser),
	    })
			  .then(function(response) {
			  	console.log(response)
			    return response.json();
			  })
			  .then(function(myJson) {
			    console.log(myJson);
			    setUser([
			      ...usersList,
			      {id:myJson.id, first_name: myJson.name}
			    ]);
			  });
	    // Specify how to clean up after this effect:
	    return function cleanup() {
	    	console.log("cleanup, newuser")
	    };		
	  	}

  }, [newUser]);   

  return (
    <div>
    	{
    		Object.keys(userSelected).length == 0 &&

	      <div>
	    		{
	    			usersList != null && usersList.map((element) => {
	    				return (
	    					<p><a onClick={() => setUserSelected(element)}>{element.id} - {element.first_name}</a></p>
	    				)
	    			})
	    		}
	    	
				<input
	        type="text"
	        value={first_name}
	        onChange={event => setFirstName(event.target.value)}
	      />   	     
	      <button type="button" onClick={() => addUser({name: first_name, job: ""})}>
	        Add
	      </button> 
	      </div> 		
    	}


      {
      	Object.keys(userSelected).length > 0 &&
      	<TestShow userSelected={userSelected} deSelect={() => setUserSelected({})}/>
      }


      {/*<button onClick={() => addusersList({id:2, name: "test"})}>
        Click from function
      </button>
      <button onClick={() => setUser([...usersList, {id:2, name: "test"}])}>
        Click innline
      </button>  */}    
    </div>
  );
}