// import { application } from "express";
import React, { useRef, useState } from "react";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicRef = useRef();

  let [profilePic, setProfilePic] = useState("./images/noimage.png");

  let onSignUp = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      profilePic: profilePicRef.current.value,
    };

    let reqOption = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(dataToSend),
    };

    let JSONData = await fetch("http://localhost:4444/register", reqOption);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };

  let onSignUpUsingUrlEncoded = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("profilePic", profilePicRef.current.value);

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4444/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };

  let onSignUpUsingFormData = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    for (let i = 0; i < profilePicRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4444/register", reqOptions);
    let JSOData = await JSONData.json();
    alert(JSOData.msg);
    console.log(JSOData);
  };

  return (
    <div>
      <form>
        <div>
          <label>FirstName:</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>LastName:</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age:</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email:</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password:</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label id="ppl">ProfilePicture: </label>
          <input id="picbutton"
            ref={profilePicRef}
            type="file"
            accept="image/*"
            onChange={(evtObj) => {
              let selectedPicPath = URL.createObjectURL(evtObj.target.files[0]);
              setProfilePic(selectedPicPath);
            }}
          ></input>
          <br></br>
          <br></br>
          <img className="PicPreview" src={profilePic} alt="profilepicture"></img>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignUp();
            }}
          >
            SignUp(JSON)
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignUpUsingUrlEncoded();
            }}
          >
            SignUp(URL Encoded)
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              onSignUpUsingFormData();
            }}
          >
            SignUp(FormData)
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
