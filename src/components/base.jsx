import React from "react";
import Base64TextArea from "./Base64TextArea";
import * as helper from "../utils/Helper";
import FileBase64 from "react-file-base64";

export const Base64Converter=()=> {
  state = {
    picture: undefined
  };

  const getFiles=(files)=> {
    let fileExt = (files.name.split(".")[1] + "").toLowerCase();
    if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg") {
      setState({ picture: files.base64 });
    } else helper.showMessage("Only supported PNG and JPG files.", "info");    
  }

 
    return (
      <div>
        <div>
          <FileBase64 multiple={false} onDone={getFiles.bind(this)} />
        </div>
        <div style={{ marginTop: "5%" }}>
          <Base64TextArea text={state.picture} />
        </div>
      </div>
    );
 
}

export default Base64Converter;