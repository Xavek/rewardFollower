import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import ProfileCard from "@/components/ui/profile";
import {
  CommentFragment,
  PostFragment,
  ProfileFragment,
  PublicationFragment,
} from "@lens-protocol/client";
import CommentCard from "@/components/ui/comments";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const lensNameRef = React.useRef<HTMLInputElement>(null);
  const [isProfile, setProfile] = React.useState<boolean>(false);
  const [isComment, setComment] = React.useState<boolean>(false);
  const [commentData, setCommentData] = React.useState<PostFragment[]>([]);
  const [profileData, setProfileData] = React.useState<ProfileFragment>();

  const handleSearch = async (event: any) => {
    event.preventDefault();
    const data = {
      lensHandle: lensNameRef.current?.value,
    };
    lensNameRef.current!.value = "";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api/form", options);
    if (res.status === 200) {
      const response = await res.json();
      console.log(response.profile[0]);
      setProfile(true);
      setProfileData(response.profile[0]);
      setComment(true);
      setCommentData(response.publications);
    } else {
      console.error("Error while fetching");
    }
  };
  return (
    <main>
      <div className="flex justify-center mt-16">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            className="text-black"
            placeholder="xyz.lens"
            name="lensname"
            ref={lensNameRef}
            required
          />
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center mt-24">
        {isProfile ? (
          <ProfileCard
            name={profileData?.name}
            handle={profileData?.handle}
            bio={profileData?.bio}
            followers={profileData?.stats.totalFollowers}
            following={profileData?.stats.totalFollowing}
            totalPost={profileData?.stats.totalPosts}
          />
        ) : null}
      </div>
      <div className="mt-16">
        {isComment
          ? commentData.map((singleData, i) => {
              return (
                <>
                  {
                    <CommentCard
                      postDescription={singleData.metadata.content}
                      postId={singleData.id}
                      key={i}
                    />
                  }
                </>
              );
            })
          : null}
      </div>
    </main>
  );
}
