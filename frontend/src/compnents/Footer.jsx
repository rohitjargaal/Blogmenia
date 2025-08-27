import React from 'react'

function Footer() {
    return (
        <div className='footer'>
            <div className="colcontainer">
                <div>
                    <h3>PRIVACY</h3>
                    <ul>
                        <li>Terms and condition</li>
                        <li>encryted data</li>
                        <li>Trusted websites</li>
                    </ul>
                </div>
                <div>
                    <h3>About</h3>
                    <ul>
                        <li><i className="fa-brands fa-instagram"></i> &nbsp;Instagram</li>
                        <li><i className="fa-brands fa-twitter"></i> &nbsp;Twitter</li>
                        <li><i className="fa-brands fa-whatsapp"></i> &nbsp;Whatsapp</li>
                        <li><i className="fa-brands fa-telegram"></i> &nbsp;Telegram</li>
                    </ul>
                </div>
                <div>
                    <h3>Contact</h3>
                    <ul>
                        <li> <i className="fa-solid fa-envelope"></i> &nbsp;rohitjargaal@gmail.com</li>
                        <li><i className="fa-solid fa-phone"></i> &nbsp;+91 7827903485</li>
                        <li><i className="fa-solid fa-headset"></i> &nbsp;Support page</li>
                        <li><i className="fa-brands fa-bots"></i> &nbsp;Personnal bot</li>
                    </ul>
                </div>
            </div>
                <p>Copyright © 2012 - 2025 TermsFeed®. All rights reserved.</p>
        </div>
    )
}

export default Footer
