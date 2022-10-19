import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import querystring from "querystring";
import { decode } from "url-encode-decode";

// /?user=AT9JNMjd4Ao62aicZT2HYFgPUHP46ttrDtBffdYjDw0%3D&brand=AT9JNMjyKFP8Pyx97XGcYz5ZVm_rIBdcxXTW_mPn4yI%3D&extensions=CONTENT&time=1666161434&state=sMk1abJvkROi3FWujJWg5YVesBSkR7hx0Pla4dGoXeSwZD9HpqXrgAUgwu3BE0upZsPl4RVlnpN6Q_IaVOCFgcr5lIntA_-eHAu5f8BA24MMsg3o3sqPzXPcfOylajDsKLprihldRU8PuC4yqr0eye40G18p5FyJ9xBiiww4Qyatvy6lHPRr4gL8s62_ToRNkVzGCj0OWdSOAJ4YTAY9Rr4YKVE&signatures=015a89d6720ea1855beda9cd0ca98c81057db6cebb1574c1b981c0c9c223bf81

// https://silver-bavarois-1eda0d.netlify.app/?
// user=AT9JNMjd4Ao62aicZT2HYFgPUHP46ttrDtBffdYjDw0%3D&
// brand=AT9JNMjyKFP8Pyx97XGcYz5ZVm_rIBdcxXTW_mPn4yI%3D&
// extensions=CONTENT&
// time=1666161267&
// state=te-hIG7jpHWoX-LHbmCr3hZLwKS-3FRBLZJzUlKf5N19R9D3KXUi-nGsp5U_LAdFGkOnubMSaDD1j3QcC43GXm7-4X_2Mi3ReftpStSA7xJQIVWgTUruhTFXlzyj6cqQZ_8KuPjZ9flBM_6H0bonnoreFbsWMhXaBppIUuzGKZTKAr4EFglrdLk1CFw9bk5khIK31V2AyWwXdLdcT6aoPm1x3go&
// signatures=2aec359279291530354b45384f69485cdc697f41fa602e1e79cd407603b3fcdb

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canvaState, setCanvaState] = useState("");
  const [userID, setUserID] = useState("");

  const { search } = useLocation();
  useEffect(() => {
    setCanvaState(search.split("&")[4].split("=")[1]);
    setUserID(decode(search.split("&")[0].split("=")[1]));
  }, []);

  async function loginUser(event) {
    event.preventDefault();
    console.log(userID);
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        userID,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.user) {
      console.log("Login successful");

      const params = querystring.stringify({
        success: true,
        state: canvaState,
      });

      window.location.href = `https://canva.com/apps/configured?${params}`;

      //   await fetch(`http://localhost:1337/${search}`, {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default App;
