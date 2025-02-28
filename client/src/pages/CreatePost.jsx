import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CreatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadingEror, setImageUploadingError] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const [createFormData, setCreateFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!imageFile) {
        setImageUploadingError("Please select an image");
        return;
      }
      setImageUploadingError(null);
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_PRESET_NAME
      );
      formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setImageUploadingProgress(progress); // Update progress state
          },
        }
      );
      setCreateFormData({
        ...createFormData,
        image: response.data.secure_url,
      });
    } catch (error) {
      setImageUploadingError(error.message);
      setImageUploadingProgress(error.message);
      setImageFile(null);
    } finally {
      setImageFile(null);
      setImageUploadingProgress(null);
    }
  };
  console.log(imageUploadingProgress);

  const handleChange = (e) => {
    setCreateFormData({ ...createFormData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-3 max-w-3xl min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a post{" "}
      </h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
          />
          <Select>
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500  border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadingProgress}
          >
            {imageUploadingProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadingProgress}
                  text={`${imageUploadingProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadingEror && (
          <Alert color="failure">{imageUploadingEror}</Alert>
        )}
        {createFormData.image && (
          <img
            src={createFormData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something...."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
