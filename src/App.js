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
export default function App(){
 const [showFriend,setShowFriend]=useState(false);
 function handleShowFriend(){
  setShowFriend((show)=>!show);
 }
  return<div className="app">
    <div className="sidebar">
      <FriendList/>
     {showFriend && <FormAddFriend/>}
      <Button onclick={handleShowFriend}>{showFriend?"close":"Add friend"}</Button>
      <FormSplitBill/>
    </div>
  </div>
}


function FriendList(){
  const friends=initialFriends;
  return(
    <ul>
    {friends.map((friend)=>
    <Friend friend={friend} key={friends.id}/>
    )}
    </ul>

);

}
// children compo of above list for rendering prop their
function Friend({friend}){
  return(
<div>
<li>
  <h3>{friend.name}</h3>
  <img src={friend.image} alt={friend.name}/>
  {friend.balance<0 &&(
    <p className="red">you owe {friend.name}{Math.abs(friend.balance)}$</p>)}

   {friend.balance>0 &&(
      <p className="green">{friend.name} owe {friend.balance}$</p>)}

      {friend.balance===0 &&(
        <p className="black">you and {friend.name} are even{friend.balance}$</p>)}
        <Button>select</Button>
</li>
</div>
  );
}

function FormAddFriend(){
  return(
    <form className="form-add-friend">
<label>🧑‍🤝‍🧑friend name</label>
<input type="text"/>
<label>📸image url</label>
<input type="text"/>
<Button>ADD</Button>
    </form> 
  );
}
function FormSplitBill(){
return(
<form className="form-split-bill">
  <h2>split the bill of all</h2>
  <label>💰 bill value</label>
  <input type="text"/>
  <label> 🙋‍♀️your expenses</label>
  <input type="text"/>
  <label>👬 other's expenses</label>
  <input type="text" disabled/>
  <Button>Split bill</Button>
  <label>who is paying</label>
  <select>
    <option value="user">you</option>
    <option value="friend">friend</option>
  </select>
</form>
);
}