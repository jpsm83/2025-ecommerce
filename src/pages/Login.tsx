import { Button } from "@/components/ui/button";
import { useActionState, useOptimistic, useState } from "react";

interface IFormState {
  fieldData: {
    username?: string;
    email: string;
    password: string;
  };
  error?: string;
}

// Define the action function with proper types
const saveAction = async (
  prevState: IFormState,
  formData: FormData
): Promise<IFormState> => {
  "use server";

  console.log("Save action triggered");

  if (prevState) console.log("Previous state: ", prevState);

  const username = formData.get("username") as string | null; // username match the input name attribute
  const email = formData.get("email") as string | null; // username match the input name attribute
  const password = formData.get("password") as string | null; // username match the input name attribute

  if (!email || !password) {
    console.log("No form data completed");
    return {
      error: "Missing form data values",
      fieldData: { username: "", email: "", password: "" },
    };
  }

  // Simulate a slow network request
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

  // Save the form data to the database
  return {
    fieldData: {
      username: username || undefined,
      email: email || "",
      password: password || "",
    },
  };
};

const Login: React.FC = () => {
  const [state, , isPending] = useActionState<IFormState, FormData>(
    saveAction,
    { fieldData: { username: "", email: "", password: "" } }
  );
  const [currState, setCurrState] = useState("Login");
  const [optimisticUsername, setOptimisticUsername] = useOptimistic<string>("");
  const [optimisticEmail, setOptimisticEmail] = useOptimistic<string>("");
  const [optimisticPassword, setOptimisticPassword] = useOptimistic<string>("");

  return (
    <>
      <form
        action={async (formData) => {
          const username = formData.get("username") as string | null;
          const email = formData.get("email") as string | null;
          const password = formData.get("password") as string | null;

          if (username) setOptimisticUsername(username);
          if (email) setOptimisticEmail(email);
          if (password) setOptimisticPassword(password);

          // Submit to `action`
          saveAction(state, formData);
        }}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currState !== "Login" && (
          <input
            className="w-full px-3 py-2 border border-gray-800"
            type="text"
            name="username"
            defaultValue={state?.fieldData?.username || optimisticUsername}
            placeholder="Username"
            disabled={isPending}
            required={currState === "Login" ? false : true}
          />
        )}
        <input
          className="w-full px-3 py-2 border border-gray-800"
          type="email"
          name="email"
          defaultValue={state?.fieldData?.email || optimisticEmail}
          placeholder="Email"
          disabled={isPending}
          required
        />
        {state?.error && <p className="text-red-500 text-md">{state.error}</p>}
        <input
          className="w-full px-3 py-2 border border-gray-800"
          type="password"
          name="password"
          defaultValue={state?.fieldData?.password || optimisticPassword}
          placeholder="Password"
          disabled={isPending}
          required
        />
        {state?.error && <p className="text-red-500 text-md">{state.error}</p>}
        <div className="w-full flex justify-end text-sm mt-[-8px]">
          {currState === "Login" ? (
            <p
              onClick={() => setCurrState("Sign Up")}
              className="cursor-pointer"
            >
              Create account
            </p>
          ) : (
            <p onClick={() => setCurrState("Login")} className="cursor-pointer">
              Login form
            </p>
          )}
        </div>
        <Button type="submit">{isPending ? "Saving..." : "Save"}</Button>
      </form>
    </>
  );
};

export default Login;
