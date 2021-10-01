import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/solid'
import Logo from './Logo'
import useDarkMode from '../hooks/useDarkMode'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ current }) {
  const [theme, setTheme] = useDarkMode()

  const navigation = [
    { name: 'Home', href: '/', current: current === 'Home' },
    {
      name: 'Matplotlib',
      href: '/matplotlib',
      current: current === 'Matplotlib',
    },
    {
      name: 'TypeScript',
      href: '/ts',
      current: current === 'TypeScript',
    },
  ]

  return (
    <div className="bg-white shadow dark:bg-gray-825">
      <Disclosure as="nav" className="mx-auto max-w-7xl">
        {({ open }) => (
          <>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <a href="https://www.runwasm.com">
                  <Logo className="h-10 my-3 w-36 dark:filter dark:invert" />
                </a>
                <div className="flex">
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'border-gray-500 dark:border-purple-400 text-gray-900 dark:text-white'
                            : 'border-transparent text-gray-500 dark:text-gray-450 hover:border-gray-300 dark:hover:border-purple-300 hover:text-gray-700 dark:hover:text-white',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <button
                      onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                      }
                      className={
                        'rounded-full self-center flex items-center justify-center h-8 w-8 p-1.5 bg-white shadow-inner border border-gray-100 capitalize'
                      }
                    >
                      {theme === 'dark' ? (<SunIcon></SunIcon>) : (<MoonIcon></MoonIcon>)}
                    </button>
                  </div>
                </div>
                <div className="flex items-center -mr-2 sm:hidden">

                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-50 border-gray-500 text-gray-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
