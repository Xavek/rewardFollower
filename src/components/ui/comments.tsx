import Link from "next/link";

type Props = {
  postDescription: string | null;
  postId: string | null;
};
export default function CommentCard({ postDescription, postId }: Props) {
  return (
    <div className="max-w-md mx-auto my-4 bg-black shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        <p className="text-sm font-semibold text-slate-200 mb-2">
          post# {postId}
        </p>
        <p className="text-white">{postDescription}</p>
      </div>
      <div className="bg-black px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              className="text-black bg-white p-2 rounded-md"
              href={{ pathname: "/comment", query: postId }}
            >
              View Comments
            </Link>
          </div>
          <div className="flex items-center">
            <a
              className="text-white"
              href={`https://lenster.xyz/posts/${postId}`}
              target="_blank"
            >
              Lenster Link
            </a>
          </div>
          <div className="flex items-center"></div>
        </div>
      </div>
    </div>
  );
}
