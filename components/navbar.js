import Link from "next/link"
import { MdAddBox } from "react-icons/md";
import { PiListNumbersFill } from "react-icons/pi";
import styles from './navbar.module.css'
import { useRouter } from "next/router";
export default function Navbar() {
    const {route} = useRouter()
    return(
        <>
        <div className={styles.navbar}>
            <div className={styles.menu}>
                <Link href='/contacts/Add' >
                <MdAddBox color={route == "/contacts/Add" ? "#03aa03" : "black"} /> Add Contact
                </Link >
                <Link href='/contacts' >
                <PiListNumbersFill color={route == "/contacts" ? "#03aa03" : "black"} /> Contacts
                </Link>
            </div>
        </div>
        </>
    )
}