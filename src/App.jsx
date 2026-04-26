import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";

const STUDENT_NAME = "Stuti Patel";

function App({ signOut, user }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadEmail() {
      try {
        const attributes = await fetchUserAttributes();
        const resolvedEmail =
          attributes?.email ?? user?.signInDetails?.loginId ?? user?.username ?? "";
        if (isMounted) {
          setEmail(resolvedEmail);
        }
      } catch (error) {
        if (isMounted) {
          setEmail(user?.signInDetails?.loginId ?? user?.username ?? "");
        }
        console.error("Unable to fetch user attributes:", error);
      }
    }

    loadEmail();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Profile</h1>
      <p>Name: {STUDENT_NAME}</p>
      <p>Email: {email}</p>

      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default App;