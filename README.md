[![CodeClimate](https://img.shields.io/codeclimate/github/Altoros/hacker-assessor.svg)](https://codeclimate.com/github/Altoros/hacker-assessor)
[![BuildStatus](https://img.shields.io/codeship/0b7b7050-4291-0133-fbf8-7680bc2f6412/master.svg)](https://codeship.com/projects/103764)

The ultimate Hacker Assessor
============================

Let's try to make a hacker (initially thought for software developers) career
plan much more transparent and easy to grow.

As a hacker
-----------

You'll have the I advantage to know exactly what would it take for you to move
to the next level/seniority/position. In order to do that I might have to
acquire a new skill or improve an existent one. It will also be great to have
pointers such as lectures, tutors, trainings, videos and books references, etc.

As an organization
------------------

It will be much easier to focus on every hacker's growth and to invest the
organization's time and money on real and concrete resources you need in order
to grow as an organization by growing on an individual hacker level basis.

How to run it
=============

First install the dependencies

    bundle install --without development,test

Setup the database

    rake db:setup

To start the server run

    rails s

To run the tests

    rake

Contributing
============

Everyone is encouraged to help improve this project.

Please submit pull requests against the **master** branch. We use the [GitHub
Flow][].

Submitting an Issue
-------------------

We use the [GitHub issue tracker][] to track bugs and features. When submitting
a bug report, please include a [Gist][] with the stack trace and any
details that may be necessary to reproduce the bug including the Lattice
version.

  [GitHub issue tracker]: https://github.com/Altoros/hacker-assessor/issues
  [Gist]: http://gist.github.com/
  [GitHub Flow]: https://guides.github.com/introduction/flow/
