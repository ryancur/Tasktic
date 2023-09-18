import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSignUpMutation } from "./app/authApi";
import { preventDefault } from "./app/utils";
import { showModal, updateField, SIGN_UP_MODAL } from "./app/accountSlice";
import Notification from "./Notification";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

function SignUpModal() {
  const dispatch = useDispatch();
  const {
    show,
    email,
    username,
    password,
    first_name,
    last_name,
    picture_url,
  } = useSelector((state) => state.account);
  const [signUp, { error, isLoading: signUpLoading }] = useSignUpMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  useEffect(() => {}, [show]);

  return (
    <Modal isOpen={show === SIGN_UP_MODAL}>
      <ModalHeader>
        {" "}
        Sign Up!
        {error ? (
          <Notification type="danger">{error.data.detail}</Notification>
        ) : null}
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={preventDefault(signUp, () => ({
            email,
            username,
            password,
            first_name,
            last_name,
            picture_url,
          }))}
        >
          <FormGroup>
            <Label>Email</Label>
            <Input
              required
              onChange={field}
              value={email}
              name="email"
              className="input"
              type="email"
              placeholder="you@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              required
              onChange={field}
              value={username}
              name="username"
              className="input"
              type="text"
              placeholder="username..."
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              required
              onChange={field}
              value={password}
              name="password"
              className="input"
              type="password"
              placeholder="secret..."
            />
          </FormGroup>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              required
              onChange={field}
              value={first_name}
              name="first_name"
              className="input"
              type="text"
              placeholder="Your first name..."
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              required
              onChange={field}
              value={last_name}
              name="last_name"
              className="input"
              type="text"
              placeholder="Your last name..."
            />
          </FormGroup>
          <FormGroup>
            <Label>Picture Url</Label>
            <Input
              onChange={field}
              value={picture_url}
              name="picture_url"
              className="input"
              type="url"
              placeholder="Your profile pic url..."
            />
          </FormGroup>
          <Button disabled={signUpLoading} color="primary" className="mr-1">
            Submit
          </Button>
          <Button
            className="ml-4"
            type="button"
            onClick={() => dispatch(showModal(null))}
            color="secondary"
          >
            Cancel
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default SignUpModal;
