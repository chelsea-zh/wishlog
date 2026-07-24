# Wishlog

Wishlog is a planner site that allows users to schedule their day and set tasks. Drawing inspiration from gacha games, Wishlog rewards consistent behavior with currency to fulfill your collecting dreams.

## Features

The home page displays a schedule block as well as a list of tasks, formated as a quest list seen in gacha games.

The schedule block will display the 24 hours of the current day. Added blocks will be displayed on the timeline, with the alarm page acting as a countdown during the scheduled blocks, as well as notify when a block starts or ends. It will also display the title of the upcoming block at the bottom. The alarm page functions as a clear timer, meant to be displayed on a second monitor.

The list of tasks has two categories: dailies and customs. 

Dailies, named after the concept of dailies in gacha games meant for grinding, are for the tasks that are repeated day after day. Daily tasks reset at midnight; claimed tasks will be unclaimed the next day. Custom tasks for the standard to-do list. Custom tasks do not reset; at the end of each week, claimed tasks are deleted.

Each task is rewarded with currency that can be spent on wishes. Tasks can be created with a specified reward amount at the bottom of the list.

Wishlog is made with React. Currently, it is unfinished, with only the home and alarm pages finished. I am still working on the wish page and Tauri.

## Demo

![ wishlog site home](src/assets/wishlogHome.png)
![ wishlog site alarm](src/assets/wishlogAlarm.png)

Demo on Vercel: https://wishlog-gules.vercel.app/ :D

No AI was used.