export default function Dropdown() {
    return (
        <div
            id="dropdownNavbar"
            class="z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
            <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
            >
                <li>
                    <a
                        href="/search"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        About a game
                    </a>
                </li>
                <li>
                    <a
                        href="/new"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        About something else
                    </a>
                </li>
            </ul>
        </div>
    )
}
