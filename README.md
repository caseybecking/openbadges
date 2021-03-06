# Mozilla Open Badges
## Overview
We intend to provide an open set of specifications, tools and services for
generating verifiable badges that users can take with them wherever they go
and use however they like.

For (a lot) more information, check out http://openbadges.org

## I'm an Issuer, how do I use this?
*Note: we're in rapid development mode now, but we're aiming for a usable beta on Sept 12th.*

Requirements:

* Webserver capable of serving requests to the general internet.
* Ability to make a POST request from your server backend and read a JSON response.
* Email addresses of the users you wish to issue badges.
* Badge image must be in PNG format.

Usage example:

1. Generate an assertion (see below) for the user recieving the badge.
2. Store that assertion at a public-but-secret URL and serve it with
`content-type: application/json`
  
  * The assertion contains private information about a user, so you want a
    non-predictable URL scheme to prevent automated scraping.
  
  * This URL should be stable - any badge issued from it relies on its
    existence for verification.
  
  * Both of these problems will be solved in the near-term future by
    supporting signed assertions, so you'll only need to expose a URL
    containing your public key.

3. Make a POST request to the open badge creator with the assertion URL. If
validation passes, you will receive an HTTP 200 with `content-type: image/png`,
the body being a your `badge.image` with the assertion URL baked into it.
4. Send/give the image to the user (for example, email it).

## Details

Please [see the page on Assertions](https://github.com/brianlovesdata/openbadges/wiki/Assertions) to
learn how to format your assertions, and [see the page on Badge Baking](https://github.com/brianlovesdata/openbadges/wiki/Badge-Baking) to
learn more about how to use the baking API and what kind of responses to
expect in case of error.
