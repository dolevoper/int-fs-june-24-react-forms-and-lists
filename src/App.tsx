import { FormEvent, useState } from "react";
import "./App.scss";
import FormField from "./FormField";

function App() {
  const [userType, setUserType] = useState("teacher");
  const [expertiseError, setExpertiseError] = useState("");

  const registerUser = (e: FormEvent<HTMLFormElement>) => {
    console.log("on submit");
    e.preventDefault();

    setExpertiseError("");

    if (!e.currentTarget.checkValidity()) {
      setExpertiseError(
        (
          e.currentTarget.elements.namedItem(
            "expertise"
          ) as HTMLInputElement | null
        )?.validationMessage ?? ""
      );

      return;
    }

    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName")?.toString();
    const lastName = formData.get("lastName")?.toString();
    const expertise = formData.get("expertise")?.toString();
    const teacherBio = formData.get("teacherBio")?.toString();
    const interests = formData.get("interests")?.toString();

    console.log({
      firstName,
      lastName,
      userType,
      expertise,
      teacherBio,
      interests,
    });
  };

  return (
    <main>
      <h1>Register {userType}</h1>
      <form onSubmit={registerUser} noValidate>
        <div className="form-field">
          <label htmlFor="first-name">First name</label>
          <Input
            id="first-name"
            name="firstName"
            type="text"
            autoFocus
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="last-name">Last name</label>
          <Input id="last-name" name="lastName" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="user-type">I want to</label>
          <select
            id="user-type"
            name="userType"
            onChange={(e) => {
              setUserType(e.currentTarget.value);
            }}
          >
            <option value="teacher">Teach</option>
            <option value="student">Learn</option>
          </select>
        </div>
        {userType === "teacher" ? (
          <TeacherExtraFields expertiseError={expertiseError} />
        ) : (
          <StudentExtraFields />
        )}
        <button>
          Start {userType === "teacher" ? "teaching" : "learning"}
        </button>
      </form>
    </main>
  );
}

type TeacherExtraFieldsProps = {
  expertiseError: string;
};

function TeacherExtraFields({ expertiseError }: TeacherExtraFieldsProps) {
  return (
    <>
      <FormField label="Expertise" htmlFor="expertise" error={expertiseError}>
        <Input
          id="expertise"
          name="expertise"
          type="text"
          required
          minLength={3}
          maxLength={100}
        />
      </FormField>
      <div className="form-field">
        <label htmlFor="teacher-bio">Bio</label>
        <textarea id="teacher-bio" name="teacherBio"></textarea>
      </div>
    </>
  );
}

function StudentExtraFields() {
  return (
    <>
      <div className="form-field">
        <label htmlFor="interests">Interests</label>
        <Input id="interests" name="interests" type="text" required />
      </div>
    </>
  );
}

function Input({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input className={["text-field", className].join(" ")} {...props} />;
}

export default App;
