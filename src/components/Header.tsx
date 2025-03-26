import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from "react-redux";

import { IStore } from "../interfaces/store";
import { clearLoginUser } from "../redux/actions/userAction";
import { capitalizeFirstLetter } from "../interfaces/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: currentUser } = useSelector((store: IStore) => store.user);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { email } = currentUser;
  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  const logout = () => {
    setIsDialogOpen(false);
    dispatch(clearLoginUser());
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        position: "sticky",
        top: 0,
        zIndex: 999,
        padding: 16,
        backgroundColor: "white",
        opacity: 0.95,
        borderBottomWidth: 2,
      }}
    >
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center justify-center"
      >
        <div>
          <p className="text-base font-extrabold">Wellness Center</p>
        </div>
      </button>
      {!isEmpty(email) && (
        <div className="flex items-center justify-center">
          <p className="text-xl mx-2">
            <strong>Name:</strong> {capitalizeFirstLetter(currentUser.name)}{" "}
          </p>
          {currentUser?.role === "provider" && (
            <p className="text-xl mx-2">
              <strong>Role:</strong> {capitalizeFirstLetter(currentUser.role)}{" "}
            </p>
          )}

          <button
            onClick={openDialog}
            className="border border-blue-500 py-2 px-5 rounded-lg"
          >
            Logout
          </button>
        </div>
      )}
      <Dialog
        open={isDialogOpen}
        keepMounted
        onClose={closeDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are You sure? Do you want to logout ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button onClick={logout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;
