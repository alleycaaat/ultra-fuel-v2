import { BiLinkExternal } from 'react-icons/bi';

export const Footer = ({ readMore, setReadMore }) => {
    return (
    <div className='footer'>
        <svg aria-hidden='true' focusable='false' viewBox='0 0 100 100' preserveAspectRatio='none'>
            <polygon fill='#6c6c6c' points='0,100 100,0 100,100' />
            <polygon fill='#6c6c6c' points='100,100 0,100 0,0' />
        </svg>
        <h2>About Ultra Fuel</h2>
        <span className='sr-only'>The links below are all external</span>
        <p>
            This web-app was created by{' '}
            <a
                href='https://achulslander.com/'
                target='_blank'
                rel='noreferrer'
            >
                AC Hulslander
                <BiLinkExternal aria-hidden='true' className='footericons' alt='external link' />
            </a>{' '}
            as a means to keep track of nutrition and hydration during an
            ultramarathon.{' '}
            { /* the checkbox doesn't display, so the label acts as the clickable element.  it's wrapped in a button so keyboard users can access it */}
            <button>
                {/* 17 Nov 2022 - htmlFor throws an error, 'React does not recognize the htmlFor prop on an element...' changing to a lowercase F also throws an error, 'Did you mean htmlFor?' so, y'know. */}
                <label htmlFor='toggle'>
                    {readMore ? 'Show less...' : 'Read more...'}
                </label>
            </button>
        </p>
        <input
            type='checkbox'
            focusable='false'
            name='toggle'
            id='toggle'
            onClick={() => setReadMore(!readMore)}
        />
        <div className='footerSlide' style={{ display: readMore ? 'block' : 'none' }}>
            <p>
                Ultra Fuel is a Jamstack web-app developed with React for
                the front-end and SCSS for styling; it is designed from a mobile-fist perspective, is responsive, optimized and addresses several issues that could impare accessibility.
            </p>
            <p>
                Fetch API calls are made to the Fauna
                database to retrieve the foods collection and hourly logs collection. The foods are saved as an object, and data is handled with the map and reduce methods. Ternary operators are
                frequently utilized to reduce the line count and speed
                up operations. React Hooks are also heavily used, specifically useState, useEffect and useRef; the latter is used in
                conjunction with the useEffect Hook to only load the
                foods collection on initial render. During some functions a loading
                screen shows to allow the API calls to the serverless functions to finish and prevent errors.
            </p>
            <p>
                Currently, this web-app is insecure in that anyone can
                add or remove food to any hour.  (However, the database key is <strong>not</strong> exposed.) This is done for demonstration purposes.  It is also catered to the hours of the event I developed the app for.  The end goal is to develop Ultra Fuel into a mobile app, and offer it for download.  Several changes will be made before that happens, such as adding a log-in option, and the ability for a user to add new foods to the database. The end-goal is to utilize an API to simply search for a food and add it, as well as having a manual option.
            </p>
            <p className='last'>
                Full code on{' '}
                <a
                    href='https://github.com/alleycaaat/ultra-fuel'
                    target='_blank'
                    rel='noreferrer'
                >
                    GitHub
                    <BiLinkExternal aria-hidden='true' className='footericons' alt='external link' />
                </a>{' '}
                |{' '}
                <a
                    href='https://achulslander.com/#contactForm'
                    target='_blank'
                    rel='noreferrer'
                >
                    Contact AC
                    <BiLinkExternal aria-hidden='true' className='footericons' alt='external link' />
                </a>
            </p>
        </div>
        </div>
    )
}