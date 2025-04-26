"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload, X } from "lucide-react"
import toast from "react-hot-toast"
import { jwtDecode } from 'jwt-decode'
import { useGetProfileByIdQuery, useUpdateUserProfileMutation } from "@/store/api/profileApiSlice"
import { URL } from "@/utils/config"

export default function ProfileForm() {
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dob, setDob] = useState('')
  const [image, setImage] = useState<string | null>('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      try {
        setUserId(jwtDecode(access_token));
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
      }
    }
  }, []);

  const { data: userData } = useGetProfileByIdQuery(userId?.sid)
  const [updateUserProfile] = useUpdateUserProfileMutation()

  // Эффект для обновления состояний при загрузке данных пользователя
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data
      setUserName(user.userName || '')
      setFirstName(user.firstName || "")
      setLastName(user.lastName || '')
      setEmail(user.email || '')
      setPhoneNumber(user.phoneNumber || '')
      setDob(user.dob || '')
      setImage(user.image || '')
      setRole(user.userRoles[0]?.name || '')
    }
  }, [userData])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("userName", userName)
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("email", email)
    formData.append("phoneNumber", phoneNumber)
    formData.append("dob", dob)
    if (image instanceof File) {
      formData.append("image", image)
    }

    updateUserProfile(formData)
  }

  const getInitials = () => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}` || "KK"
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg my-10">
      <CardHeader>
        <CardTitle className="text-2xl">Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Preview */}
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-32 h-32 border-2 border-primary/10 mb-4">
              <AvatarImage src={`${URL}/images/${image}`} alt="Profile" />
              <AvatarFallback className="text-2xl bg-primary/10">{getInitials()}</AvatarFallback>
            </Avatar>

            <div className="flex items-center gap-2">
              <label htmlFor="image" className="cursor-pointer">
                <span className="border-[2px] rounded-md px-3 py-1 text-sm">
                  Change Photo
                </span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0])
                    }
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Recommended: Square JPG, PNG, or GIF, at least 500x500 pixels.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Username */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium mb-1">
                Username
              </label>
              <Input
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
              />
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Date of Birth - Simple date input */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <Input
                id="dob"
                name="dob"
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="yy-mm-dd"
              />
            </div>

            {/* Role - Display Only */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="h-10 px-3 py-2 rounded-md bg-primary/10 text-primary flex items-center">
                {role}
              </div>
            </div>
          </div>
          <CardFooter className="flex justify-end gap-2 border-t bg-muted/50 p-6">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}