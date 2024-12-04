import { Col, Container, Row } from "react-bootstrap";
import style from "./Footer.module.css"
export function Footer(){
    return( 
        <div className={style.bg_color_dark}>
        <Container className={[style.bg_color_dark, style.margint_auto]}>  
        <Row>
            <Col className={style.color_white}>
                <p className="text-center pt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Temporibus esse veniam qui reiciendis delectus eligendi quasi quis. 
                    Sunt, aut? 
                    Sit ullam cupiditate aspernatur alias nisi voluptatum nemo quam exercitationem corporis.
                </p>
            </Col>
        </Row>  
        </Container> 
        </div> 
    )
}