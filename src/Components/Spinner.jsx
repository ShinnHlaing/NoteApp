import React from "react";

export default function Spinner() {
    return (
        <div>
            <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
            <span className="sr-only"></span>
        </div>
    )
}