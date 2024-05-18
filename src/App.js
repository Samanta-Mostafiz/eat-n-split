import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
// ei button component ta jekono jagi <Button></Button> die use kora jabe.ekhane eshe alada kore kisu kora lagbena
function Button({children,onclick}){
  return <button className="button" onClick={onclick}>{children}</button>
}

// parent of all\\
export default function App(){
  const[friends,setFriend]=useState(initialFriends)
 const [showFriend,setShowFriend]=useState(false);
 const [selectedFriend,setSelectedFriend]=useState(null);



 function handleShowFriend(){
  setShowFriend((show)=>!show);
 }
 function handleAddFriend(friend){
  setFriend((friends)=>[...friends,friend]);
 }
function handleSelectedFriend(friend){
// setSelectedFriend(friend)
setSelectedFriend((selectedFriend)=>(selectedFriend?.id===friend.id?null:friend));

}



  return<div className="app">
    <div className="sidebar">
      <FriendList 
      friends={friends}
      selectedFriend={selectedFriend}
      onSelection={handleSelectedFriend}
      />

     {showFriend && <FormAddFriend 
     onAddFriend={handleAddFriend}
     />}

      <Button onclick={handleShowFriend}>{showFriend?"close":"Add friend"}</Button>

      {selectedFriend&&<FormSplitBill
      selectedFriend={selectedFriend}
      />}


    </div>
  </div>
}





function FriendList({friends,onSelection,selectedFriend}){
  return(
    <ul>
    {friends.map((friend)=>
    <Friend 
    friend={friend} 
    key={friends.id}
    onSelection={onSelection}
    selectedFriend={selectedFriend}
    />
    )}
    </ul>

);

}
// children compo of above list for rendering prop their
function Friend({friend,onSelection,selectedFriend}){
  const isSelected=selectedFriend?.id===friend.id;
  return(
<div>
<li className={isSelected?"selected":""}>
  <h3>{friend.name}</h3>
  <img src={friend.image} alt={friend.name}/>
  {friend.balance<0 &&(
    <p className="red">you owe {friend.name}{Math.abs(friend.balance)}$</p>)}

   {friend.balance>0 &&(
      <p className="green">{friend.name} owe {friend.balance}$</p>)}

      {friend.balance===0 &&(
        <p>you and {friend.name} are even{friend.balance}$</p>)}

        <Button onclick={()=>onSelection(friend)}>{isSelected?"close":"select"}</Button>
</li>
</div>
  );
}



function FormAddFriend({onAddFriend}){
  const[name,setName]=useState("");
  const[image,setImage]=useState("https://i.pravatar.cc/48?u=499476");

  function handleSubmit(e){
     e.preventDefault();

     if(!name||!image)return;
     const id=crypto.randomUUID();
     const newFriend={
      id,
      name,
      image:`${image}?={id}`,
      balance:0
     };
     onAddFriend(newFriend);
  }


  return(
    <form className="form-add-friend" onSubmit={handleSubmit}>
<label>🧑‍🤝‍🧑friend name</label>
<input type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<label>📸image url</label>
<input type="text"
value={image}
onChange={(e)=>setImage(e.target.value)}
/>
<Button>ADD</Button>
    </form> 
  );
}



function FormSplitBill({selectedFriend}){
return(
<form className="form-split-bill">
  <h2>split the bill of all {selectedFriend.name}</h2>
  <label>💰 bill value</label>
  <input type="text"/>
  <label> 🙋‍♀️your expenses</label>
  <input type="text"/>
  <label>👬{selectedFriend.name} expenses</label>
  <input type="text" disabled/>
  
  <label>who is paying</label>
  <select>
    <option value="user">you</option>
    <option value="friend">friend</option>
  </select>
  <Button>Split bill</Button>
</form>
);
}