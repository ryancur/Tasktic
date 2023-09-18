import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogInMutation } from "./app/authApi";
import { eventTargetSelector as target, preventDefault } from "./app/utils";
import { showModal, updateField, LOG_IN_MODAL } from "./app/accountSlice";
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

function LogInModal() {
  const dispatch = useDispatch();
  const { show, username, password } = useSelector((state) => state.account);
  const [logIn, { error, isLoading: logInLoading }] = useLogInMutation();
  const field = useCallback(
    (e) =>
      dispatch(updateField({ field: e.target.name, value: e.target.value })),
    [dispatch]
  );

  return (
    <Modal isOpen={show === LOG_IN_MODAL}>
      <ModalHeader>
        {" "}
        LOG IN
        {error ? <Notification>{error.data.detail}</Notification> : null}
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={preventDefault(logIn, target)}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              required
              onChange={field}
              value={username}
              name="username"
              className="input"
              type="email"
              placeholder="you@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
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
          <Button disabled={logInLoading} color="primary">
            Submit
          </Button>
          <Button
            className="ml-1"
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

export default LogInModal;
