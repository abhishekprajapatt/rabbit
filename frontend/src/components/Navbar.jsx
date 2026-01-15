import {
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Menu,
  UserPen,
} from 'lucide-react';
import WiteLogo from '../assets/whitelogo.png';
import BlackLogo from '../assets/blacklogo.png';
import React, { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || 'User log out.');
      navigate('/login');
    }
  }, [isSuccess]);

  console.log(user);
  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to="/" className="flex items-center gap-2">
          <img src={WiteLogo} className="w-10 hidden dark:block " />
          <img src={BlackLogo} className="w-10 dark:hidden" />
          <h1 className="hidden md:block font-extrabold text-2xl">Rabbit</h1>
        </Link>
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      user?.photoUrl ||
                      'https://wallpaperaccess.com/full/6856338.jpg'
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel
                  className="flex gap-2 cursor-pointer"
                  onClick={() => navigate('profile')}
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.photoUrl ||
                        'https://wallpaperaccess.com/full/6856338.jpg'
                      }
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-gray-700 font-serif">
                      {user?.name}
                    </h1>
                    <h1 className="text-xs text-gray-400 font-thin">
                      {user?.email}
                    </h1>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link
                      to="my-learning"
                      className="flex gap-2 cursor-pointer"
                    >
                      <LibraryBig size={20} />
                      My learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile" className="flex gap-2 cursor-pointer">
                      <UserPen size={20} />
                      Edit Profile
                    </Link>{' '}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logoutHandler}
                    className="flex gap-2 cursor-pointer"
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === 'instructor' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link
                        to="/admin/dashboard"
                        className="flex gap-2 cursor-pointer"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button onClick={() => navigate('/login')}>Signup</Button>
            </div>
          )}
          <DarkMode className="mr-8" />
        </div>
      </div>
      {/* Mobile device  */}
      <div className="flex md:hidden items-center px-2 justify-between h-full">
        <h1 className="flex font-extrabold gap-2 text-2xl">
          <img src={WiteLogo} className="w-8 hidden dark:block" />
          <img src={BlackLogo} className="w-8 dark:hidden" />
          <Link to="/" className="font-extrabold text-2xl my-2">
            Rabbit
          </Link>
        </h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="rounded-full hover:bg-gray-200"
              variant="outline"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="flex flex-row items-center justify-between mt-2">
              <SheetTitle
                className="flex gap-2 cursor-pointer"
                onClick={() => navigate('profile')}
              >
                <Avatar>
                  <AvatarImage
                    src={
                      user?.photoUrl ||
                      'https://wallpaperaccess.com/full/6856338.jpg'
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h1 className="flex gap-4 font-bold text-gray-700 font-serif">
                    {user?.name}
                    <DarkMode />
                  </h1>
                  <h1 className="text-xs text-gray-400 font-thin">
                    {user?.email}
                  </h1>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Separator className="mr-2" />
            <nav className="flex flex-col space-y-4">
              <Link to="/my-learning" className="flex gap-2 cursor-pointer">
                <LibraryBig /> My Learning
              </Link>
              <Link to="/profile" className="flex gap-2 cursor-pointer">
                {' '}
                <UserPen />
                Edit Profile
              </Link>
              <p className="flex gap-2 cursor-pointer">
                {' '}
                <LogOut />
                Log out
              </p>
            </nav>
            <div className="flex right-0">
              {user?.role === 'instructor' && (
                <SheetFooter className="">
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      onClick={() => navigate('/admin/dashboard')}
                    >
                      {' '}
                      <LayoutDashboard size={30} />
                      Dashboard
                    </Button>
                  </SheetClose>
                </SheetFooter>
              )}
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 text-white rounded-full"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <DarkMode />
        </div>
      )}
    </>
  );
};
