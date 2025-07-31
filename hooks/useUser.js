import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "/firebase/app"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user)
    });
    
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.push("/");
    }
  }, [user, router]);

  return user;
}