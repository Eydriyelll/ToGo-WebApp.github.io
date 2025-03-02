"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { updateProfile } from "@/lib/auth"
import { storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { Camera, Mail, UserIcon, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [uploading, setUploading] = useState(false)

  const handleUpdateProfile = async () => {
    if (!user) return
    try {
      await updateProfile(user, { displayName })
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return

    try {
      setUploading(true)
      const file = e.target.files[0]
      const storageRef = ref(storage, `profile-pictures/${user.uid}`)
      await uploadBytes(storageRef, file)
      const photoURL = await getDownloadURL(storageRef)
      await updateProfile(user, { photoURL })
      alert("Profile picture updated successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={user?.photoURL || ""} />
                <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-[#A79277] rounded-full cursor-pointer hover:bg-[#8a7660] transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={user?.email || ""} disabled className="pl-10" />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Member Since</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input value={user?.metadata.creationTime || ""} disabled className="pl-10" />
              </div>
            </div>

            <Button onClick={handleUpdateProfile} className="w-full bg-[#A79277] hover:bg-[#8a7660]">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

