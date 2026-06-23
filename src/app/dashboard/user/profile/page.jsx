'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { User } from 'lucide-react';
import { updateProfileAction } from '@/lib/action/userProfile';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [displayImage, setDisplayImage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhotoURL(user.image); 
      setDisplayImage(user.image); 
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    const userId = user?.id;
    const userEmail = user?.email;

    setIsUpdating(true);

    const result = await updateProfileAction(userId, {
      name,
      photoURL,
      userEmail, 
    });

    if (result.success) {

        if (authClient?.updateUser) {
          await authClient.updateUser({
            name: name,
            image: photoURL,
          });
        }

      setDisplayImage(photoURL);
      setIsUpdating(false);

      toast.success('Profile updated successfully!');
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else {
      setIsUpdating(false);
      toast.error(result.message || 'Failed to update profile');
    }
  };

  return (
    <div className="space-y-6 pb-10 mt-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          My Profile
        </h1>
        <p className="text-sm text-default-400">
          Update your personal details and profile picture
        </p>
      </div>

      <Card className="border border-default-200/60 bg-background/60 backdrop-blur-md p-6 shadow-sm" radius="lg">
        <form onSubmit={handleUpdate} className="space-y-6">
          
          <div className="flex flex-col items-center space-y-3">
            <div className="relative group w-28 h-28 rounded-full overflow-hidden border-2 border-divider bg-default-100 flex items-center justify-center">
              {displayImage ? (
                <img src={displayImage} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-default-400" />
              )}
            </div>
            <p className="text-xs text-default-400">Profile Picture</p>
          </div>

          <div className="space-y-4 ">
            <div>
              <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-medium w-full"
              variant="bordered"
              radius="xl"
              required
            />
            </div>

            <div>
              <Input
              type="url"
              label="Profile Image URL"
              placeholder="image URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="font-medium w-full"
              variant="bordered"
              radius="xl"
              required
            />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isUpdating}
            className="w-full font-bold bg-neutral-900 dark:bg-zinc-200 text-white dark:text-black h-11 rounded-xl shadow-sm"
          >
            Save Changes
          </Button>

        </form>
      </Card>
    </div>
  );
};

export default UserProfilePage;