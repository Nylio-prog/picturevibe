import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);

    const { name, picture, sub} = decoded;

    const user = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };

    localStorage.setItem('user', JSON.stringify(user));
    
    client.createIfNotExists(user).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
              <GoogleLogin
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                >
              </GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
