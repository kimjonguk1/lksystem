package org.example.lksystem.controllers.home;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class HomeController {
    @RequestMapping(value = "/", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView home() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/index");
        return modelAndView;
    }

    @RequestMapping(value = "/about", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView about() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/about");
        return modelAndView;
    }

    @RequestMapping(value = "/location", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView location() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/location");
        return modelAndView;
    }

    @RequestMapping(value = "/services", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView services() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/services");
        return modelAndView;
    }

    @RequestMapping(value = "/projects", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView projects() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/projects");
        return modelAndView;
    }

    @RequestMapping(value = "/contact", method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE)
    public ModelAndView contact() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home/contact");
        return modelAndView;
    }
}
