$(document).ready(function(){
    getTasks();
    $('#task_form').on('submit', addTask);
    $('.task_list').on('click', '.complete', completeTask);
});

function addTask() {
    event.preventDefault();

    var results = {};

    $.each($('#task_form').serializeArray(), function(i, field) {
        results[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/new_task',
        data: results,
        success: function(data) {
            if(data) {
                getNewTask();
            } else {
                console.log('error');
            }
            $('#task_form').find('input[type=text]').val('');
        }
    });
}

function getNewTask() {
    $.ajax({
        type: 'GET',
        url: '/new_task',
        success: function (data) {
            appendTasks(data);
        }
    });
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/get_all',
        success: function (data) {
            $('.task_list').children().remove();
            appendTasks(data);
        }
    });
}

function appendTasks(data) {

    data.forEach(function(task) {
        $('.task_list').append('<div class="tasks"></div>');

        var $el = $('.task_list').children().last();

        $el.append('<p>Task Id: ' + task.id + ' </p>');
        $el.append('<p>Task: ' + task.task + '</p>');
        $el.append('<button class="complete" data-id = " '+ task.id +' ">Complete</button>');
        $el.append('<button class="delete" data-delete = " '+ task.id +' ">Delete</button>');
    });
}

function completeTask() {
    event.preventDefault();

    var completed = {};
    var index = $(this).data('id');

    completed.task = index;
    console.log(completed);

    $.ajax({
        type: 'POST',
        url: '/complete',
        data: completed,
        success: function(data) {
            if(data) {
               console.log('data posted');
            } else {
                console.log('error');
            }
        }
    });
}

