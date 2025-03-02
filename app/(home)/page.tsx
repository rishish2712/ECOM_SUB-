"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
    useEffect(() => {
        fetch("/api/home")
            .then(res => res.json())
            .then(data => {
              console.log(data)
              setMessage(data.message);
            });
    }, []);
    const [message, setMessage] = useState("Loading");

    return <div>
      <h1>Home</h1>
      <p>{message}</p>
    </div>;
}
