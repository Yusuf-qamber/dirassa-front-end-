const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()

    
    if (!res.ok) throw new Error(data.err || 'Something went wrong')

    if (data.token) {
      localStorage.setItem('token', data.token)
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]))
      return decodedToken
    }

  } catch (err) {
    
    throw err
  }
}

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if (data.token) {
      
      localStorage.setItem('token', data.token)
      
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]))
      return decodedToken
    }

  } catch (err) {
    console.log(err)
  }
}

const getUser = () => {
  const token = localStorage.getItem('token')
  if (token) {
    
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      return decodedToken
  } else {
    return null
  }
}

const googleSignIn = async (credential) => {
  try {
    const res = await fetch(`${BASE_URL}/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.err || "Google login failed");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);

      const decodedToken = JSON.parse(
        atob(data.token.split(".")[1])
      );

      return {
        success: true,
        user: decodedToken,
      };
    }

    return {
      success: false,
      message: "No token received",
    };

  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export {
  signUp,
  signIn,
  getUser,
  googleSignIn,
}