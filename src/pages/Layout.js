import './Layout.scss';
import './GlobalStyle.scss';
export const Layout = (props) => {
    return (
        <header id="pageHeader">
            <div className='flexColumn'>

                <img height="70" src="https://madrasafree.com/wp-content/uploads/2022/02/logo.png" class="attachment-large size-large" alt="" loading="lazy" />



                {props.text ? (<h1>{props.text}</h1>) : (
                    <div>
                        <p>

                            <a href='http://localhost:3000/teacher'>Teacher</a>
                        </p>
                        <p>

                            <a href='http://localhost:3000/Student'>Student</a>
                        </p>

                    </div>
                )}
                <img src="https://madrasa-images.s3.eu-west-2.amazonaws.com/new-designs/play.png" width="120" alt="play" />

            </div>
        </header>
    )
}
export default Layout