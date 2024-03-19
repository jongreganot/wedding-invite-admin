import React from "react"
import { useNavigate } from "react-router";

const CustomLink = (props) => {
    const navigate = useNavigate();

    async function goToPage() {
      navigate(`/wedding-invite-admin/${props.linkName.toLowerCase()}`);
    }

    return (
        <div onClick={goToPage} className="d-flex flex-row align-items-center justify-content-center py-2 h-100 w-100 cursor-pointer">
          <p className="mb-0 fs-extra-small pe-none text-light">{props.linkText ? props.linkText: props.linkName}</p>
        </div>
  )
};

export default CustomLink;