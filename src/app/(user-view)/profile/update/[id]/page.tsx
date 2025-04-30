"use client";

import type React from "react";
import { useState, useRef, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Camera,
  User,
  Mail,
  MapPin,
  Globe,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/actions/user.action";
import { User as UserType } from "@/types";
import { LoadingPage } from "@/components/ui/loading";

interface Social {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");

  const { data: USER, isLoading } = useQuery<UserType | null>({
    queryKey: ["profileData"],
    queryFn: () => getProfile(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (USER) {
      setFormData({
        name: USER.name,
        bio: USER.bio || "",
        location: USER.location || "",
        website: USER.website || "",
        twitter: (USER.social as Social)?.twitter || "",
        facebook: (USER.social as Social)?.facebook || "",
        instagram: (USER.social as Social)?.instagram || "",
        linkedin: (USER.social as Social)?.linkedin || "",
      });
    }
  }, [USER]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverPreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(`/api/profile/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onSuccess: () => {
      router.push(`/profile/${id}`);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUserData = {
      name: formData.name,
      bio: formData.bio,
      location: formData.location,
      website: formData.website,
      avatar: avatarPreview,
      cover: coverPreview,
      social: {
        twitter: formData.twitter,
        facebook: formData.facebook,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
      },
    };
    updateUser(updatedUserData);
  };

  if (isLoading) {
    <div className="h-screen flex items-center justify-center">
      <LoadingPage />
    </div>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/profile")}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Profile
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Edit Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Cover Image Section */}
            <div className="relative h-[200px] rounded-lg overflow-hidden bg-muted">
              <img
                src={coverPreview || USER?.cover || "/placeholder.jpg"}
                alt="Cover"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => coverInputRef.current?.click()}
                    className="gap-1"
                  >
                    <Upload className="h-4 w-4" />
                    Change Cover
                  </Button>
                  {coverPreview !== USER?.cover && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        setCoverPreview(USER?.cover || "/placeholder.jpg")
                      }
                      className="gap-1"
                    >
                      <X className="h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </div>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Avatar Section */}
            <div className="relative -mt-16 ml-4 md:ml-8">
              <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-background">
                <img
                  src={avatarPreview || USER?.avatar || "/placeholder.jpg"}
                  alt="Avatar"
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => avatarInputRef.current?.click()}
                    className="h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </div>
              {avatarPreview !== "" && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() =>
                    setAvatarPreview(USER?.avatar || "placeholder.jpg")
                  }
                  className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">Basic Information</h2>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="flex items-center gap-1"
                        >
                          <User className="h-4 w-4" /> Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="username"
                          className="flex items-center gap-1"
                        >
                          <User className="h-4 w-4" /> Username
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          value={USER?.username}
                          disabled
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label
                          htmlFor="bio"
                          className="flex items-center gap-1"
                        >
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          value={formData.bio || ""}
                          placeholder="Tell us about yourself"
                          onChange={handleChange}
                          rows={4}
                        />
                        <p className="text-xs text-muted-foreground">
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">
                      Contact Information
                    </h2>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="flex items-center gap-1"
                        >
                          <MapPin className="h-4 w-4" /> Location
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location || ""}
                          onChange={handleChange}
                          placeholder="City, Country"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="website"
                          className="flex items-center gap-1"
                        >
                          <Globe className="h-4 w-4" /> Website
                        </Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-semibold">Social Links</h2>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="twitter"
                          className="flex items-center gap-1"
                        >
                          <Twitter className="h-4 w-4" /> Twitter
                        </Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            @
                          </span>
                          <Input
                            id="twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            className="rounded-l-none"
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="facebook"
                          className="flex items-center gap-1"
                        >
                          <Facebook className="h-4 w-4" /> Facebook
                        </Label>
                        <Input
                          id="facebook"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleChange}
                          placeholder="username"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="instagram"
                          className="flex items-center gap-1"
                        >
                          <Instagram className="h-4 w-4" /> Instagram
                        </Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                            @
                          </span>
                          <Input
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="rounded-l-none"
                            placeholder="username"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="linkedin"
                          className="flex items-center gap-1"
                        >
                          <Linkedin className="h-4 w-4" /> LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          name="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" className="gap-1">
                <Save className="h-4 w-4" />
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;
