import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactQuillComponent from "../components/ReactQuillComponent";

const UpdatePost = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadingEror, setImageUploadingError] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const { postId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?postId=${postId}`);
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setUpdateFormData(data.posts[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

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
        import.meta.env.VITE_CLOUDINARY_PRESET_NAME,
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
              (progressEvent.loaded / progressEvent.total) * 100,
            );
            setImageUploadingProgress(progress); // Update progress state
          },
        },
      );
      setUpdateFormData({
        ...updateFormData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: "PuT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateFormData),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        Create a post{" "}
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, title: e.target.value })
            }
            value={updateFormData.title}
          />
          <Select
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, category: e.target.value })
            }
            value={updateFormData.category}
          >
            <option value={"uncategorized"}>Select a category</option>
            <option value={"javascript"}>JavaScript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
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
              <div className="h-16 w-16">
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
        {updateFormData.image && (
          <img
            src={updateFormData.image}
            alt="upload"
            className="h-72 w-full object-cover"
          />
        )}
        <ReactQuillComponent
          theme="snow"
          placeholder="Write something...."
          className="mb-12 h-72"
          required
          onChange={(value) =>
            setUpdateFormData({ ...updateFormData, content: value })
          }
          value={updateFormData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
