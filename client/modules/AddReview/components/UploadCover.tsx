import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Upload, Button, message, Progress } from "antd";
import { FaCloudUploadAlt } from "react-icons/fa";
import { CgPlayListRemove } from "react-icons/cg";
import type { UploadProps } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
const savedTheme = localStorage.getItem("theme");
console.log("upload comp", savedTheme);
export interface CoverImageUploadRef {
  reset: () => void;
}

const CoverImageUpload = forwardRef<
  CoverImageUploadRef,
  {
    onUploadSuccess: (url: string) => void;
    profile?: boolean;
  }
>(({ onUploadSuccess, profile = false }, ref) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadDone, setUploadDone] = useState(false);

  // Allow parent to reset
  useImperativeHandle(ref, () => ({
    reset: () => {
      setFileList([]);
      setUploading(false);
      setProgress(0);
      setPreviewUrl(null);
      setUploadDone(false);
    },
  }));

  const handleUploadChange: UploadProps["onChange"] = async (info) => {
    const fileObj: any = info.file.originFileObj || info.file;

    if (!fileObj) {
      message.error("No file found to upload");
      return;
    }

    setFileList([info.file]);
    setPreviewUrl(URL.createObjectURL(fileObj));
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("cover", fileObj);

    try {
      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          message.success(
            `${profile ? "Profile" : "Cover"} photo uploaded successfully!`
          );
          setUploadDone(true);
          onUploadSuccess(data.url);
        } else {
          const error = JSON.parse(xhr.responseText);
          message.error(error.message || "Upload failed");
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        message.error("Something went wrong during upload.");
      };

      xhr.open("POST", `http://localhost:4000/upload-${"cover"}`, true);
      xhr.send(formData);
    } catch (error) {
      setUploading(false);
      message.error("Upload failed.");
      console.error(error);
    }
  };

  const handleChangePhoto = () => {
    // Reset state to allow new upload
    setFileList([]);
    setPreviewUrl(null);
    setUploadDone(false);
    setProgress(0);
  };

  return (
    <div className="space-y-1 flex justify-center items-center flex-col">
      <label className="block text-sm font-medium mb-0">
        {profile ? "Profile Photo" : "Cover Image"}
      </label>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          className={`max-w-xs rounded border ${profile ? "h-[100px] w-[100px] rounded-full" : "h-[150px]"}`}
        />
      )}

      {!uploadDone && (
        <>
          <Upload
            accept="image/*"
            beforeUpload={() => false}
            onChange={handleUploadChange}
            maxCount={1}
            fileList={fileList}
            showUploadList={false}
          >
            <Button
              icon={<FaCloudUploadAlt />}
              loading={uploading}
              disabled={uploading}
              style={{
                width: profile ? 200 : 600,
                backgroundColor: savedTheme === "dark" ? "#1f2937" : "",
                color: savedTheme === "dark" ? "#ffff" : "",
              }}
            >
              {uploading
                ? "Uploading..."
                : profile
                  ? "Click to Change Profile"
                  : "Click to Upload"}
            </Button>
          </Upload>

          {uploading && <Progress percent={progress} status="active" />}
        </>
      )}

      {uploadDone && (
        <Button
          onClick={handleChangePhoto}
          type="dashed"
          className="border-gray-400 flex justify-center items-center"
        >
          <CgPlayListRemove className=" text-xl text-red-500" />
          Remove {profile ? "Profile" : "Cover"} Photo
        </Button>
      )}
    </div>
  );
});

export default CoverImageUpload;
