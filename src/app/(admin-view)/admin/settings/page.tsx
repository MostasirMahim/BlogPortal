"use client";

import type React from "react";
import { useState } from "react";
import {
  Save,
  Globe,
  Mail,
  BellRing,
  FileText,
  ImageIcon,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "DailyNews",
    siteDescription:
      "Your trusted source for the latest news and in-depth reporting on politics, technology, business, and more.",
    siteUrl: "https://dailynews.example.com",
    adminEmail: "admin@dailynews.example.com",
    postsPerPage: "10",
    dateFormat: "MMMM D, YYYY",
    timeFormat: "h:mm a",
  });

  const [contentSettings, setContentSettings] = useState({
    defaultCategory: "uncategorized",
    allowComments: true,
    moderateComments: true,
    allowUserRegistration: true,
    defaultUserRole: "reader",
    enableRichTextEditor: true,
    maxUploadSize: "5",
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@dailynews.example.com",
    smtpPassword: "••••••••••••",
    senderName: "DailyNews",
    senderEmail: "notifications@dailynews.example.com",
    enableEmailNotifications: true,
  });

  const handleGeneralChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (name: string, value: any) => {
    setContentSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your news portal settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> General
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Content
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <BellRing className="h-4 w-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* General Settings */}
          <TabsContent value="general" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic site settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteUrl">Site URL</Label>
                    <Input
                      id="siteUrl"
                      name="siteUrl"
                      value={generalSettings.siteUrl}
                      onChange={handleGeneralChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralChange}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      name="adminEmail"
                      type="email"
                      value={generalSettings.adminEmail}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postsPerPage">Posts Per Page</Label>
                    <Input
                      id="postsPerPage"
                      name="postsPerPage"
                      type="number"
                      value={generalSettings.postsPerPage}
                      onChange={handleGeneralChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select
                      value={generalSettings.dateFormat}
                      onValueChange={(value) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          dateFormat: value,
                        }))
                      }
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MMMM D, YYYY">
                          January 1, 2023
                        </SelectItem>
                        <SelectItem value="MM/DD/YYYY">01/01/2023</SelectItem>
                        <SelectItem value="DD/MM/YYYY">01/01/2023</SelectItem>
                        <SelectItem value="YYYY-MM-DD">2023-01-01</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select
                      value={generalSettings.timeFormat}
                      onValueChange={(value) =>
                        setGeneralSettings((prev) => ({
                          ...prev,
                          timeFormat: value,
                        }))
                      }
                    >
                      <SelectTrigger id="timeFormat">
                        <SelectValue placeholder="Select time format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="h:mm a">1:30 pm</SelectItem>
                        <SelectItem value="HH:mm">13:30</SelectItem>
                        <SelectItem value="h:mm:ss a">1:30:00 pm</SelectItem>
                        <SelectItem value="HH:mm:ss">13:30:00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Site Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-muted flex items-center justify-center rounded-md">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" /> Upload Logo
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Content Settings */}
          <TabsContent value="content" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
                <CardDescription>
                  Configure content management and user permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultCategory">Default Category</Label>
                  <Select
                    value={contentSettings.defaultCategory}
                    onValueChange={(value) =>
                      handleContentChange("defaultCategory", value)
                    }
                  >
                    <SelectTrigger id="defaultCategory">
                      <SelectValue placeholder="Select default category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uncategorized">
                        Uncategorized
                      </SelectItem>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Comments</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowComments">Allow Comments</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable comments on all posts
                      </p>
                    </div>
                    <Switch
                      id="allowComments"
                      checked={contentSettings.allowComments}
                      onCheckedChange={(checked) =>
                        handleContentChange("allowComments", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="moderateComments">
                        Moderate Comments
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require approval before comments are published
                      </p>
                    </div>
                    <Switch
                      id="moderateComments"
                      checked={contentSettings.moderateComments}
                      onCheckedChange={(checked) =>
                        handleContentChange("moderateComments", checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">User Registration</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowUserRegistration">
                        Allow User Registration
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow visitors to create accounts
                      </p>
                    </div>
                    <Switch
                      id="allowUserRegistration"
                      checked={contentSettings.allowUserRegistration}
                      onCheckedChange={(checked) =>
                        handleContentChange("allowUserRegistration", checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultUserRole">Default User Role</Label>
                    <Select
                      value={contentSettings.defaultUserRole}
                      onValueChange={(value) =>
                        handleContentChange("defaultUserRole", value)
                      }
                    >
                      <SelectTrigger id="defaultUserRole">
                        <SelectValue placeholder="Select default role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reader">Reader</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Media Settings</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableRichTextEditor">
                        Rich Text Editor
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Enable rich text editing for posts
                      </p>
                    </div>
                    <Switch
                      id="enableRichTextEditor"
                      checked={contentSettings.enableRichTextEditor}
                      onCheckedChange={(checked) =>
                        handleContentChange("enableRichTextEditor", checked)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxUploadSize">
                      Maximum Upload Size (MB)
                    </Label>
                    <Input
                      id="maxUploadSize"
                      type="number"
                      value={contentSettings.maxUploadSize}
                      onChange={(e) =>
                        handleContentChange("maxUploadSize", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>
                  Configure email server and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input
                      id="smtpServer"
                      name="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      name="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      name="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={emailSettings.senderName}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableEmailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for new comments and user
                      registrations
                    </p>
                  </div>
                  <Switch
                    id="enableEmailNotifications"
                    checked={emailSettings.enableEmailNotifications}
                    onCheckedChange={(checked) =>
                      setEmailSettings((prev) => ({
                        ...prev,
                        enableEmailNotifications: checked,
                      }))
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Admin Notifications</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when a new user registers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Comment</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when a new comment is posted
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Post Submission</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when a new post is submitted for review
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Security Alerts</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Failed Login Attempts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify after multiple failed login attempts
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Admin Login</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when an admin user logs in
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when system updates are available
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
